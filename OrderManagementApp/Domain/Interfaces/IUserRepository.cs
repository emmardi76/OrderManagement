using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Domain.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUser();
        User GetUserById(int id);
        User GetUserByName(string name);
        bool ExistUser(string user);
        User RegisterUser(User user, string password);
        User LoginUser(string email, string password);
        bool UpdateUser(User user);
        bool DeleteUser(int id);
        bool Save();
    }
}
