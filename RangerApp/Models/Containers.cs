using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class Containers
    {
        public long Id { get; set; }
        public string Produksjonsmodell { get; set; }
        public DateTime Avgdato { get; set; }
        public DateTime Ankdato { get; set; }
        public string Fra { get; set; }
        public string Til { get; set; }
        public string Togrutenummer { get; set; }
        public string Rutekode { get; set; }
        public string Turnr { get; set; }
        public string Lastbærer { get; set; }
        public string Contbilnr { get; set; }
        public string Plombenummer { get; set; }
        public string Bpx { get; set; }
        public int? Produksjonsvindu1 { get; set; }
        public string Produksjonsvindu1løslast { get; set; }
        public string Produksjonsvindu2 { get; set; }
        public string Produksjonsvindu2løslast { get; set; }
        public string Parti { get; set; }
        public string Brev { get; set; }
        public string Pru { get; set; }
        public bool Tom { get; set; }
        public string Innholdsbeskrivelse { get; set; }
        public bool Tildelt { get; set; }
        public string Sjåførnavnmerknad { get; set; }
        public bool Losset { get; set; }
        public bool Hentet { get; set; }
        public bool Levert { get; set; }
        public int? LastStatus { get; set; }
        public int? MovingTo { get; set; }
        public int? DriverId { get; set; }
        public bool? Accepted { get; set; }
        public bool Completed { get; set; }
        public string Opprettetav { get; set; }
        public string Endretav { get; set; }
        public DateTime Endret { get; set; }
        public DateTime Opprettet { get; set; }
    }
}
