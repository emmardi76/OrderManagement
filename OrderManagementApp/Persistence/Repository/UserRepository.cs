using Microsoft.EntityFrameworkCore;
using OrderManagementApp.Application.Dtos;
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

        public void DeleteUser(User user)
        {
            _orderContext.Set<User>().Remove(user);
        }

        public async Task<ICollection<User>> GetUsers(UserQueryDto? userQueryDto = null)
        {
            var users = _orderContext.Users.AsQueryable<User>();

            if (userQueryDto != null)
            {
                if (userQueryDto.Id.HasValue)
                {
                    users = users.Where(u => u.Id == userQueryDto.Id.Value);
                }

                if (userQueryDto.FirstName is not null)
                {
                    users = users.Where(u => u.FirstName != null && u.FirstName.Contains(userQueryDto.FirstName));
                }

                if (userQueryDto.LastName is not null)
                {
                    users = users.Where(u => u.LastName != null && u.LastName.Contains(userQueryDto.LastName));
                }

                if (userQueryDto.PhoneNumber is not null)
                {
                    users = users.Where(u => u.PhoneNumber != null && u.PhoneNumber.Contains(userQueryDto.PhoneNumber));
                }

                if (userQueryDto.Email is not null)
                {
                    users = users.Where(u => u.Email != null && u.Email.Contains(userQueryDto.Email));
                }
            }

            return await users.OrderBy(u => u.FirstName).ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _orderContext.Users.FirstOrDefaultAsync(u => u.Id == id);           
        }

        public async Task<User?> GetUserByName(string name)
        {
           return await _orderContext.Users.FirstOrDefaultAsync(u => u.FirstName == name);          
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _orderContext.Users.FirstOrDefaultAsync(u => u.Email == email);                
        }

        public void RegisterUser(User user)
        {
            _orderContext.Users.Add(user);
        }

        public async Task<bool> Save()
        {
            return await _orderContext.SaveChangesAsync() >= 0 ? true : false;
        }

        public void UpdateUser(User user)
        {
            _orderContext.Set<User>().Update(user);
        }       
    }
}