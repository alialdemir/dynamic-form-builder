using System.ComponentModel.DataAnnotations;

namespace FormBuilder.Models
{
    public class AnswerModel
    {
        public int InputId { get; set; }
        [Required(ErrorMessage = "UserAnswer alanı zorunlu alan.")]
        public string UserAnswer { get; set; }
    }
}