using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IUserService
    {
        UserDto RegisterUser(UserDto userDto, string password);
        UserDto? LoginUser(string email, string password);
        public bool ExistUser(string user);
        public ICollection<UserDto> GetUsers();
        public UserDto? GetUserById(int id);
        public UserDto? GetUserByEmail(string email);
        public bool UpdateUser(User user);
        public bool DeleteUser(int id);
        public bool Save();
    }
}
