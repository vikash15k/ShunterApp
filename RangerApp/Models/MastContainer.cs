using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class MastContainer
    {
        public int Id { get; set; }
        public string Containername { get; set; }
        public bool? Active { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Updatedby { get; set; }
        public DateTime? Updateddate { get; set; }
    }
}
