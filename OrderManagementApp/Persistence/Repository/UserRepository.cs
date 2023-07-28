using Microsoft.AspNetCore.Identity;
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

        public ICollection<User> GetUser()
        {
            return _orderContext.Users.OrderBy(u => u.FirstName).ToList();
        }

        public User GetUserById(int id)
        {
            var result = _orderContext.Users.FirstOrDefault(u => u.Id == id);
            if (result != null)
                return result;
            else
                return null;
        }

        public User GetUserByName(string name)
        {
           var result = _orderContext.Users.FirstOrDefault(u => u.FirstName == name);

            if (result != null)
                return result;
            else
                return null;
        }

        public User LoginUser(string email, string password)//check it
        {
            var user = _orderContext.Users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));// &&  (_orderContext.Users.FirstOrDefault(u => u.PasswordHash.Equals(password))
           

            if (user == null)
            {
                return null;
            }

            var passwordVerificationResult = new PasswordHasher<User?>().VerifyHashedPassword(null, user.PasswordHash, password);
            switch (passwordVerificationResult)
            {
                case PasswordVerificationResult.Failed:
                    Console.WriteLine("Password incorrect.");
                    break;

                case PasswordVerificationResult.Success:
                    Console.WriteLine("Password ok.");
                    break;

                case PasswordVerificationResult.SuccessRehashNeeded:
                    Console.WriteLine("Password ok but should be rehashed and updated.");
                    break;

                default:
                    throw new ArgumentOutOfRangeException();
            }

            return user;
        }

        public User RegisterUser(User user, string password)
        {
            var hashedPassword = new PasswordHasher<User?>().HashPassword(null, password);
            user.PasswordHash = hashedPassword;

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