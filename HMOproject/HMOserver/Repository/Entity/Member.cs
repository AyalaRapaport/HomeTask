using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Member
    {
        public int Id { get; set; }
        public int PersonalInfoId { get; set; }
        [ForeignKey("PersonalInfoId")]
        public virtual PersonalDetails PersonalInfo { get; set; }
        public int CovidInfoId { get; set; }
        [ForeignKey("CovidInfoId")]
        public virtual CovidDetails CovidInfo { get; set; }
    }
}
