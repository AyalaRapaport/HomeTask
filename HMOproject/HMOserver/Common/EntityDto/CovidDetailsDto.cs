using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDto
{
    public class CovidDetailsDto
    {
        public int ?Id { get; set; }
        public virtual ICollection<VaccinationDto> ?Vaccinations { get; set; }
        public DateTime? PositiveResultDate { get; set; } 
        public DateTime ?RecoveryDate { get; set; }
    }
}
