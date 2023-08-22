using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class UserAuthDto: UserDto
    {       
        public string Token { get; set; }
    }
}
