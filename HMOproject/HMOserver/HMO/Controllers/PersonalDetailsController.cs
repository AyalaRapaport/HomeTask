using Common.EntityDto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
//using Newtonsoft.Json;
using Repository.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalDetailsController : ControllerBase
    {
        private readonly IService<PersonalDetailsDto> service;
        public PersonalDetailsController(IService<PersonalDetailsDto> service)
        {
            this.service = service;
        }
        // GET: api/<PersonalDetailsController>
        [HttpGet]
        public async Task<List<PersonalDetailsDto>> Get()
        {
            var personalDetails = await service.GetAll();
            foreach (var p in personalDetails)
            {
                p.UrlProfileImg = GetImage(p.UrlProfileImg);
            }
            return personalDetails;
        }

        [HttpGet("getImage/{UrlProfileImg}")]
        public string GetImage(string UrlProfileImg)
        {
            var path = Path.Combine(Environment.CurrentDirectory + "/Images/", UrlProfileImg);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // GET api/<PersonalDetailsController>/5
        [HttpPost("{id}")]
        public async Task<PersonalDetailsDto> Get(int id)
        {
            return await service.Get(id);

        }

        // POST api/<PersonalDetailsController>
        [HttpPost()]
        public async Task<IActionResult> Post([FromForm] PersonalDetailsDto personalDetails)
        {
            
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + personalDetails.ProfileImg.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                personalDetails.ProfileImg.CopyTo(fs);
                fs.Close();
            }
            personalDetails.UrlProfileImg = personalDetails.ProfileImg.FileName;
            return Ok(await service.Add(personalDetails));
        }

        // PUT api/<PersonalDetailsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] PersonalDetailsDto personalDetails)
        {
            if (personalDetails.ProfileImg!=null) { 
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + personalDetails.ProfileImg.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                personalDetails.ProfileImg.CopyTo(fs);
                fs.Close();
            }
            personalDetails.UrlProfileImg = personalDetails.ProfileImg.FileName;
            }
            return Ok(await service.Put(id,personalDetails));
        }

        // DELETE api/<PersonalDetailsController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.Delete(id);

        }
    }
}
