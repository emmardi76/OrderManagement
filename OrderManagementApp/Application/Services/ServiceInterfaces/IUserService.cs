using OrderManagementApp.Application.Dtos;

namespace OrderManagementApp.Application.Services.ServiceInterfaces
{
    public interface IUserService
    {
        Task<UserDto> RegisterUser(RegisterUserDto registerUserDto);
        Task<UserAuthDto?> LoginUser(string email, string password);
        Task<bool> ExistUser(string firstName, string lastName);
        Task<ICollection<UserDto>> GetUsers(UserQueryDto userQueryDto);
        Task<UserDto?> GetUserById(int id);
        Task<UserDto?> GetUserByEmail(string email);
        Task<UserDto> UpdateUser(RegisterUserDto userDto);
        Task DeleteUser(int id);
    }
}
