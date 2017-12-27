using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FormBuilder.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }
        [Required(ErrorMessage = "InputId alanı zorunlu alan.")]
        public int InputId { get; set; }
        [MaxLength(500, ErrorMessage = "Id alanı maksimum 500 karakter olmalı.")]
        [Required(ErrorMessage = "UserAnswer alanı zorunlu alan.")]
        public string UserAnswer { get; set; }
    }
}