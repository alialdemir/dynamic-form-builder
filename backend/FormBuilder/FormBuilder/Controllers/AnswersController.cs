using FormBuilder.DbContext;
using FormBuilder.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace FormBuilder.Controllers
{
    public class AnswersController : ApiController
    {
        private readonly FormBuilderDbContext _formBuilderDbContext;
        public AnswersController()
        {
            // TODO: Autofac veya ninject gibi bir kütüphane ile dependency injection sağlanabilirdi
            _formBuilderDbContext = new FormBuilderDbContext();
        }
        /// <summary>
        /// Get form answers by form id
        /// </summary>
        /// <param name="formId">Form id to display</param>
        /// <returns>Form answers list</returns>
        public IHttpActionResult Get([FromUri]int formId)
        {
            if (formId <= 0)
                return NotFound();

            var formInputs = (from i in _formBuilderDbContext.Inputs
                              join a in _formBuilderDbContext.Answers on i.InputId equals a.InputId
                              where i.FormId == formId
                              select new FormAnswerModel
                              {
                                  UserAnswer = a.UserAnswer,
                                  Label = i.Label
                              }).ToList();

            if (formInputs == null)
                return NotFound();

            return Ok(formInputs);
        }
        /// <summary>
        /// Save form answers
        /// </summary>
        /// <param name="inputs">Responses to the completed form</param>
        public IHttpActionResult Post([FromBody]List<AnswerModel> userAnswers)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<Answer> answers = userAnswers.Select(p => new Answer
            {
                InputId = p.InputId,
                UserAnswer = p.UserAnswer
            }).ToList();
            _formBuilderDbContext.Answers.AddRange(answers);
            _formBuilderDbContext.SaveChanges();
            return Ok();
        }
    }
}