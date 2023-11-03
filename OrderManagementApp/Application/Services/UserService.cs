using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OrderManagementApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly string keyValue;
        private readonly string issuer;
        private readonly int expirationTime;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration config)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            keyValue = config.GetSection("JWT_KEY").GetSection("key").Value.ToString();
            issuer = config.GetSection("JWT_KEY").GetSection("issuer").Value.ToString();
            expirationTime = Int32.Parse(config.GetSection("JWT_KEY").GetSection("ExpirationTime").Value);
        }

        public async Task<bool> ExistUser(string firstName, string lastName)
        {
            var users = await _userRepository.GetUsers(new UserQueryDto { FirstName = firstName, LastName = lastName });

            return users.Any();
        }


        public async Task<ICollection<UserDto>> GetUsers(UserQueryDto userQueryDto)
        {
            var ListUsers = await _userRepository.GetUsers(userQueryDto);

            return _mapper.Map<List<UserDto>>(ListUsers);
        }

        public async Task<UserDto?> GetUserById(int id)
        {
            var itemUser = await _userRepository.GetUserById(id);

            if (itemUser == null)
            {
                return null;
            }

            var itemUserDto = _mapper.Map<UserDto>(itemUser);

            return itemUserDto;
        }

        public async Task<UserDto?> GetUserByEmail(string email)
        { 
            var itemUser = (await _userRepository.GetUserByEmail(email));

            if (itemUser == null)
            {
                return null;
            }

            var itemUserDto = _mapper.Map<UserDto>(itemUser);

            return itemUserDto;
        }

        public async Task<UserAuthDto?> LoginUser(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            UserAuthDto userAuthDto = new UserAuthDto(); //Check it asing all values of UserDto to userAuthDto

            if (user == null)
            {
                return null;
            }

            var passwordVerificationResult = new PasswordHasher<User?>().VerifyHashedPassword(null, user.PasswordHash, password);
            switch (passwordVerificationResult)
            {
                case PasswordVerificationResult.Failed:
                    Console.WriteLine("Password incorrect.");
                    return null;

                case PasswordVerificationResult.Success:
                    Console.WriteLine("Password ok.");
                    _mapper.Map(user, userAuthDto);                    
                    userAuthDto.Token = GetJWT(user.Email);
                    break;

                case PasswordVerificationResult.SuccessRehashNeeded:
                    Console.WriteLine("Password ok but should be rehashed and updated.");
                    break;

                default:
                    return null;
            }

            return userAuthDto;
        }

        public async Task<UserDto> RegisterUser(RegisterUserDto registerUserDto)
        {
            var itemUser = await _userRepository.GetUserByEmail(registerUserDto.Email);

            if (itemUser != null)
            {
                throw new InvalidOperationException("The user already exists");
            }

            var user = _mapper.Map<User>(registerUserDto);
            var hashedPassword = new PasswordHasher<User>().HashPassword(null, registerUserDto.Password);
            user.PasswordHash = hashedPassword;
            _userRepository.RegisterUser(user);
            await _userRepository.Save();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateUser(RegisterUserDto userDto)
        {
            var user = await _userRepository.GetUserById(userDto.Id);
            if (user is null) 
            {
                throw new InvalidOperationException($"The user with id {userDto.Id} does not exist.");
            }
            _mapper.Map(userDto, user);
            var hashedPassword = new PasswordHasher<User>().HashPassword(null, userDto.Password);
            user.PasswordHash = hashedPassword;
            await _userRepository.Save();

            return _mapper.Map<UserDto>(user);
        }

        public async Task DeleteUser(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null) 
            {
                throw new InvalidOperationException($"The user with id {id} does not exist.");
            }
            _userRepository.DeleteUser(user);
            await _userRepository.Save();
        }

        private string GetJWT(string email)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var secureId = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new  Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, email),
                new  Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenBody = new JwtSecurityToken(
                issuer: issuer,
                audience: issuer,
                claims,
                expires: DateTime.Now.AddMinutes(expirationTime),
                signingCredentials: secureId);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenBody);

            return token;
        }
    }
}
