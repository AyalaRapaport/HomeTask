using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Common.EntityDto
{
    public class PersonalDetailsDto
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string ?LastName { get; set; }
        public string ?MemberId { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public int? Number { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string ?PhoneNumber { get; set; }
        public string ?MobileNumber { get; set; }
        public IFormFile? ProfileImg { get; set; }
        public string ?UrlProfileImg { get; set; }

    }
}
