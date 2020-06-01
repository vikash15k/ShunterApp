using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public int Roleid { get; set; }
        public int? Terminalid { get; set; }
        public bool IsOnline { get; set; }
        public bool? IsActive { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
