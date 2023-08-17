using System.ComponentModel.DataAnnotations;

namespace OrderManagementApp.Application.Dtos
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = "The user email is obligatory")]
        public required string Email { get; set; }
        [Required(ErrorMessage = "The user password is obligatory")]
        public required string Password { get; set; }
    }
}
