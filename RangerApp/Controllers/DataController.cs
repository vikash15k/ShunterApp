using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RangerApp.Models;
using RangerApp.InternalClass;
using Newtonsoft.Json;

namespace RangerApp.Controllers
{

    [Route("api/[controller]")]
    public class DataController : Controller
    {
        dbrangerappdevContext db = new dbrangerappdevContext();

        //[HttpGet("[action]")]
        //public IEnumerable<EventMessages> GetEvents()
        //{
        //    return db.EventMessages.ToList();
        //}
        [HttpPost("[action]")]
        public Users Login(String username, string password)
        {
            //User c = JsonConvert.DeserializeObject<User>(jsonContainer);
            return db.Users.Where(x => x.Email == username && x.Password == password).FirstOrDefault();
        }

        [HttpGet("[action]")]
        public IEnumerable<Containers> GetEvents(string id)
        {
            string sourceLocation = "Molde";
            return FetchEvents(id, sourceLocation);
        }
        [HttpGet("[action]")]
        public IEnumerable<Containers> GetEventsWithSourceLocation(string id, string sourceLocation)
        {

            return FetchEvents(id, db.MastTerminal.Find(Convert.ToInt32(sourceLocation)).TerminalName);
        }

        [HttpGet("[action]")]
        public IEnumerable<Containers> GetContainers()
        {
            return db.Containers.ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<Users> GetDriverList(string id)
        {
            return db.Users.Where(x => x.Roleid == 4).ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<MastTerminal> GetLocations()
        {
            return db.MastTerminal.Where(x => x.Status == true).ToList();
        }

        [HttpPost("[action]")]
        public string UpdateContainer([FromBody]  String jsonContainer)
        {

            Containers c = JsonConvert.DeserializeObject<Containers>(jsonContainer);

            if (c.Id > 0)
            {
                Containers old = db.Containers.Find(c.Id);
                db.Entry(old).CurrentValues.SetValues(c);
                db.SaveChanges();
            }
            else
            {

                c.LastStatus = 50;
                c.Accepted = false;
                //c.Completed = false;
                c.Endret = DateTime.Now;
                c.Opprettet = DateTime.Now;
                db.Containers.Add(c);
                db.SaveChanges();
            }
            return "success";
        }

        [HttpPost("[action]")]
        public string AssignContainer([FromBody]  String jsonContainer)
        {
            try
            {
                CombinedClass combinedClass = JsonConvert.DeserializeObject<CombinedClass>(jsonContainer);
                combinedClass.EventMessages.TripId = combinedClass.Containers.Id;
                db.EventMessages.Add(combinedClass.EventMessages);
                
                Containers old = db.Containers.Where(x=>x.Id==combinedClass.Containers.Id).FirstOrDefault();
                if (old != null)
                {
                    combinedClass.Containers = old;
                    combinedClass.Containers.DriverId = combinedClass.EventMessages.DriverId;
                    combinedClass.Containers.MovingTo = combinedClass.EventMessages.MovingTo;
                    combinedClass.Containers.LastStatus = combinedClass.EventMessages.Status;
                    combinedClass.Containers.Opprettetav = combinedClass.Containers.Endretav = combinedClass.EventMessages.DriverId.ToString();
                    combinedClass.Containers.Opprettet = combinedClass.Containers.Endret = DateTime.Now;
                    db.Entry(old).CurrentValues.SetValues(combinedClass.Containers);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return ex.InnerException.ToString();
            }

            return "success";
        }



        private IEnumerable<Containers> FetchEvents(string id, string sourceLocation)
        {

            var containers = db.Containers.Where(x => (x.Accepted == true && string.Compare(x.Til, sourceLocation, StringComparison.OrdinalIgnoreCase) == 0) || (x.Accepted==false && string.Compare(x.Fra, sourceLocation, StringComparison.OrdinalIgnoreCase) == 0)).GroupBy(x => x.Contbilnr).Select(x => x.OrderByDescending(y => y.Avgdato).FirstOrDefault()).ToList();
            switch (id)
            {
                case "1":
                    return containers;
                case "2":
                    return containers.Where(x => x.LastStatus >= 10 && x.LastStatus < 20).ToList();
                case "3":
                    return containers.Where(x => x.LastStatus >= 20 && x.LastStatus < 30).ToList();
                case "4":
                    return containers.Where(x => x.LastStatus >= 30 && x.LastStatus < 40).ToList();
                case "5":
                    return containers.Where(x => x.LastStatus >= 40 && x.LastStatus < 50).ToList();
                case "6":
                    return containers.Where(x => x.LastStatus >= 50 && x.LastStatus < 60).ToList();
                default:
                    return containers.ToList();
            }
        }
    }
}
