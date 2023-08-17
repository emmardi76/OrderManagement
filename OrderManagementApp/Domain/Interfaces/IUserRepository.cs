using OrderManagementApp.Domain.Entities;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User? GetUserById(int id);
        User? GetUserByName(string name);
        User? GetUserByEmail(string email);
        bool ExistUser(string user);
        User RegisterUser(User user);        
        bool UpdateUser(User user);
        bool DeleteUser(int id);
        bool Save();
    }
}
