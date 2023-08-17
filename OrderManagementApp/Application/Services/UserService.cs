using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;       

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;            
        }

        public bool ExistUser(string user)
        {
            _userRepository.ExistUser(user);
            return true;
        }

        public ICollection<UserDto> GetUsers()
        {
            var ListUsers =  _userRepository.GetUsers();

            var ListUsersDto = new List<UserDto>();

            foreach (var List in ListUsers)
            {
                ListUsersDto.Add(_mapper.Map<UserDto>(List));
            }
            return ListUsersDto;
        }

        public UserDto? GetUserById(int id)
        {
            var itemUser = _userRepository.GetUserById(id);

            if (itemUser == null)
            {
                return null;
            }

            var itemUserDto = _mapper.Map<UserDto>(itemUser);

            return itemUserDto;
        }

        public UserDto? GetUserByEmail(string email)
        { 
            var itemUser = (_userRepository.GetUserByEmail(email));

            if (itemUser == null)
            {
                return null;
            }

            var itemUserDto = _mapper.Map<UserDto>(itemUser);

            return itemUserDto;
        }

        public UserDto? LoginUser(string email, string password)
        {
            var user = _userRepository.GetUserByEmail(email);


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
                    return null;
            }

            return _mapper.Map<UserDto>(user);
        }

        public UserDto RegisterUser(UserDto userDto, string password)
        {
            var itemUser = _userRepository.GetUserByEmail(userDto.Email);

            if (itemUser != null)
            {
                throw new InvalidOperationException("The user already exists");
            }

            var user = _mapper.Map<User>(userDto);
            var hashedPassword = new PasswordHasher<User>().HashPassword(null, password);
            user.PasswordHash = hashedPassword;
            _userRepository.RegisterUser(user);

            return _mapper.Map<UserDto>(user);
        }

        public bool UpdateUser(User user)
        {
            if (_userRepository.UpdateUser(user))
            {
                _userRepository.Save();
                return true;
            }

            return false;
        }

        public bool DeleteUser(int id)
        {
            if (_userRepository.DeleteUser(id))
            {
                _userRepository.Save();
                return true;
            }

            return false;
        }

        public bool Save()
        {
            return _userRepository.Save();
        }
    }
}
