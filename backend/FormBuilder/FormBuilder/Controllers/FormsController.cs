using FormBuilder.DbContext;
using FormBuilder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace FormBuilder.Controllers
{
    public class FormsController : ApiController
    {
        private readonly FormBuilderDbContext _formBuilderDbContext;
        public FormsController()
        {
            // TODO: Autofac veya ninject gibi bir kütüphane ile dependency injection sağlanabilirdi
            _formBuilderDbContext = new FormBuilderDbContext();
        }
        /// <summary>
        /// Get form inputs by guid id
        /// </summary>
        /// <param name="guidId"></param>
        /// <returns>Form inputs</returns>
        public IHttpActionResult Get([FromUri]string guidId)
        {
            if (String.IsNullOrEmpty(guidId))
                return NotFound();

            // Parametreden gelen guild id değerine ait form inputlarını aldım
            var formInputs = (from f in _formBuilderDbContext.Forms.AsEnumerable()
                              where f.GuidId.ToString() == guidId
                              join i in _formBuilderDbContext.Inputs on f.FormId equals i.FormId
                              orderby i.InputId ascending
                              select new InputModel
                              {
                                  Description = i.Description,
                                  Label = i.Label,
                                  Placeholder = i.Label,
                                  Required = i.Required,
                                  Type = i.Type,
                                  Options = i.Options.Split(','),
                                  InputId = i.InputId
                              }).ToList();

            if (formInputs == null)
                return NotFound();

            return Ok(formInputs);
        }
        /// <summary>
        /// Get form ids
        /// </summary>
        /// <param name="formId">Form id to display</param>
        /// <returns>Form inputs</returns>
        public IHttpActionResult Get()
        {
            // form listesi için form id ve guidleri çekildi
            var formInputs = _formBuilderDbContext
                                        .Forms
                                        .Select(p => new
                                        {
                                            Label = p.FormId,
                                            GuidId = p.GuidId.ToString()
                                        }).ToList();

            if (formInputs == null)
                return NotFound();

            return Ok(formInputs);
        }

        /// <summary>
        /// Save inputs on form
        /// </summary>
        /// <param name="inputs">Input information on the form</param>
        public IHttpActionResult Post([FromBody]IEnumerable<InputModel> inputs)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Form form = new Form();
            inputs.ToList().ForEach(p =>// Yeni bir form oluşturulup inputları eklendi
            {
                string options = String.Empty;
                if (p.Options != null) options = String.Join(",", p.Options);

                form.Inputs.Add(new Input// TODO: burada bir mapping işlemi yapılmalı
                {
                    FormId = form.FormId,
                    Type = p.Type,
                    Label = p.Label,
                    Description = p.Description,
                    Required = p.Required,
                    Placeholder = p.Placeholder,
                    Options = options
                });
            });

            _formBuilderDbContext.Forms.Add(form);
            _formBuilderDbContext.SaveChanges();
            return Ok();
        }
    }
}
