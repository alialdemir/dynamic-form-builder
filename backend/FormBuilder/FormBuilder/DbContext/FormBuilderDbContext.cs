using FormBuilder.Models;
using System.Data.Entity;

namespace FormBuilder.DbContext
{
    public class FormBuilderDbContext : System.Data.Entity.DbContext
    {
        public DbSet<Input> Inputs { get; set; }
        public DbSet<Form> Forms { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public FormBuilderDbContext() : base("DefaultConnection")
        {

        }
    }
}