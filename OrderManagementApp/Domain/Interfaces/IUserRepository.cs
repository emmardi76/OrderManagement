using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsers(UserQueryDto userQueryDto);
        Task<User?> GetUserById(int id);
        Task<User?> GetUserByName(string name);
        Task<User?> GetUserByEmail(string email);
        void RegisterUser(User user);        
        void UpdateUser(User user);
        void DeleteUser(User user);
        Task<bool> Save();
    }
}
