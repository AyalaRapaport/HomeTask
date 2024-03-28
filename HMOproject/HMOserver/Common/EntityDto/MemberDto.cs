using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDto
{
    public class MemberDto
    {
        public int? Id { get; set; }
        public int CovidInfoId { get; set; }
        public int PersonalInfoId { get; set; }
        public PersonalDetailsDto? PersonalInfo { get; set; }
        public CovidDetailsDto? CovidInfo { get; set; }
    }
}
