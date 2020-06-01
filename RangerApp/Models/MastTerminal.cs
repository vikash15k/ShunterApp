using System;
using System.Collections.Generic;

namespace RangerApp.Models
{
    public partial class MastTerminal
    {
        public int Id { get; set; }
        public string TerminalName { get; set; }
        public bool? Status { get; set; }
    }
}
