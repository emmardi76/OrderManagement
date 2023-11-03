using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController: Controller
    {
        private readonly IUserService _userService;       

        public UserController(IUserService userService)
        {
            _userService = userService;            
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            return Ok(await _userService.RegisterUser(registerUserDto));
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser(UserLoginDto userLoginDto)
        {
           var user = await _userService.LoginUser(userLoginDto.Email, userLoginDto.Password);          

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("existUser", Name = "ExistUser")]
        public async Task<IActionResult> ExistUser(string firstName, string lastName)
        { 
            return Ok(await _userService.ExistUser(firstName, lastName));
        }
        
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers([FromQuery] UserQueryDto userQueryDto)
        {
            return Ok(await _userService.GetUsers(userQueryDto));
        }            

        [AllowAnonymous]
        [HttpPut(Name ="UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] RegisterUserDto user)
        {
            await _userService.UpdateUser(user);            

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpDelete("{id:int}", Name = "DeleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUser(id);
            return Ok();
        }
    }
}
