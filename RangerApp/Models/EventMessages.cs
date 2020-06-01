using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class EventMessages
    {
        public long Id { get; set; }
        public long TripId { get; set; }
        public string Container { get; set; }
        public int DriverId { get; set; }
        public string Deviation { get; set; }
        public string Message { get; set; }
        public int Status { get; set; }
        public int MovingTo { get; set; }
        public DateTime EventTime { get; set; }
    }
}
