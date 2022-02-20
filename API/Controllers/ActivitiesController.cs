using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {   
            return await Mediator.Send(new ActivitiesList.Query());             //auto convert data to JSON
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await Mediator.Send( new ActivityDetails.Query{ Id = id } );
        }

        [HttpPost]
        public async Task<IActionResult> PostActivity(Activity activity)
        {
            return Ok( await Mediator.Send(new AddActivity.Command { Activity = activity} ));
        }
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateActivity (Guid Id , Activity activity)
        {
            activity.Id = Id;
            return Ok(await Mediator.Send(new EditActivity.Command{Activity = activity}));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteActivity (Guid Id)
        {
            return Ok(await Mediator.Send(new DeleteActivity.Command{Id = Id}));
        }
    }
}

