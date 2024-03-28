using Common.EntityDto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IService<MemberDto> service;
        public MemberController(IService<MemberDto> service)
        {
            this.service = service;
        }

        // GET: api/<MemberController>
        [HttpGet]
        public async Task<List<MemberDto>> Get()
        {
           var members = await service.GetAll();

            return members;
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

        // GET api/<MemberController>/5
        [HttpPost("{id}")]
        public async Task<MemberDto> Get(int id)
        {
            return await service.Get(id);
        }

        // POST api/<MemberController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MemberDto memberDto)
        {
           
            return Ok(await service.Add(memberDto));
        }

        // PUT api/<MemberController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] MemberDto memberDto)
        {
            //var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + memberDto.PersonalInfo.ProfileImg.FileName);
            //Console.WriteLine("myPath: " + myPath);

            //using (FileStream fs = new FileStream(myPath, FileMode.Create))
            //{
            //    memberDto.PersonalInfo.ProfileImg.CopyTo(fs);
            //    fs.Close();
            //}
            //memberDto.PersonalInfo.UrlProfileImg = memberDto.PersonalInfo.ProfileImg.FileName;
            return Ok(await service.Put(id,memberDto));
        }

        // DELETE api/<MemberController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.Delete(id);
        }
    }
}
