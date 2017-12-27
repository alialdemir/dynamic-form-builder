using System;
using System.Collections.Generic;
namespace FormBuilder.Models
{
    public class Form
    {
        public int FormId { get; set; }
        public Guid GuidId { get; set; } = Guid.NewGuid();
        public virtual List<Input> Inputs { get; set; } = new List<Input>();
    }
}