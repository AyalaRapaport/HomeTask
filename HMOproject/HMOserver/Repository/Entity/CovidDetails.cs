using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class CovidDetails
    {
        public int Id { get; set; }
        public virtual ICollection<Vaccination> Vaccinations { get; set; }
        public DateTime PositiveResultDate { get; set; } 
        public DateTime RecoveryDate { get; set; }
    }
}
