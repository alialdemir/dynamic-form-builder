using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace FormBuilder.Models
{
    public class InputModel
    {
        [JsonProperty(PropertyName = "component")]
        [MaxLength(30, ErrorMessage = "Type alanı maksimum 30 karakter olmalı.")]
        [Required(ErrorMessage = "Type alanı zorunlu alan.")]
        public string Type { get; set; }

        [MaxLength(250, ErrorMessage = "Label alanı maksimum 250 karakter olmalı.")]
        [Required(ErrorMessage = "Label alanı zorunlu alan.")]
        public string Label { get; set; }

        [MaxLength(250, ErrorMessage = "Placeholder alanı maksimum 250 karakter olmalı.")]
        public string Placeholder { get; set; }

        [MaxLength(250, ErrorMessage = "Description alanı maksimum 250 karakter olmalı.")]
        public string Description { get; set; }

        public bool? Required { get; set; }

        public string[] Options { get; set; }

        public int InputId { get; set; }
    }
}
