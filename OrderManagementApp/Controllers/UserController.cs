using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Controllers
{
    public class UserController: Controller
    {
        private readonly IUserService _userService;       

        public UserController(IUserService userService)
        {
            _userService = userService;            
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser(UserDto userDto, string password)
        {
            return Ok(_userService.RegisterUser(userDto, password));
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public IActionResult LoginUser(UserLoginDto userLoginDto)
        {
           var user = _userService.LoginUser(userLoginDto.Email, userLoginDto.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("{user:string}", Name = "ExistUser")]
        public IActionResult ExistUser(string user)
        { 
            return Ok(_userService.ExistUser(user));
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetUsers());
        }

        [AllowAnonymous]
        [HttpGet("{id:int}", Name = "GetUserById")]
        public IActionResult GetUserById(int id) // Check if must return a userDto or user and do the conversion in service or controller
        { 
            var itemUser = _userService.GetUserById(id);

            if (itemUser == null)
            {
                return NotFound();
            }

            return Ok(itemUser);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetUserByEmail(string email)
        {
            var itemUser =  _userService.GetUserByEmail(email);

            if (itemUser == null)
            {
                return NotFound();
            }

            return Ok(itemUser);
        }

        [AllowAnonymous]
        [HttpPost("{user:User}", Name ="UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            var result = _userService.UpdateUser(user);

            if (result == false)
            { 
                return BadRequest();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("{id:int}", Name = "DeleteUser")]
        public IActionResult DeleteUser(int id)
        { 
            var result = _userService.DeleteUser(id);

            if (result == false)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("Save")]
        public IActionResult Save()
        {
            var result = _userService.Save();

            if (result == false)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}
