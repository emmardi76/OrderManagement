using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Persistence.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly OrderContext _orderContext;

        public UserRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        public bool DeleteUser(int id)
        {
            _orderContext.Set<User>().Remove(GetUserById(id));
            return true;
        }

        public bool ExistUser(string user)
        {
            if (_orderContext.Users.Any(u => u.FirstName == user))
            {
                return true;
            }
                
            return false;
        }

        public ICollection<User> GetUsers()
        {
            return _orderContext.Users.OrderBy(u => u.FirstName).ToList();
        }

        public User? GetUserById(int id)
        {
            return _orderContext.Users.FirstOrDefault(u => u.Id == id);           
        }

        public User? GetUserByName(string name)
        {
           return _orderContext.Users.FirstOrDefault(u => u.FirstName == name);          
        }

        public User? GetUserByEmail(string email)
        {
            return _orderContext.Users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));                
        }

        public User RegisterUser(User user)
        {
            _orderContext.Users.Add(user);
            Save();
            return user;
        }

        public bool Save()
        {
            return _orderContext.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateUser(User user)
        {
            _orderContext.Set<User>().Update(user);

            return true;
        }       
    }
}