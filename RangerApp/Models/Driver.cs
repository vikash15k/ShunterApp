using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class Driver
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Terminal { get; set; }
        public bool IsOnline { get; set; }
        public string Status { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
