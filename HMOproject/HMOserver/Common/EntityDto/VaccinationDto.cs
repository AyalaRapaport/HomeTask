using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.EntityDto
{
    public class VaccinationDto
    {
        public int ?Id { get; set; }
        public DateTime? VaccinationDate { get; set; }
        public string ?VaccineManufacturer { get; set; }
    }
}
