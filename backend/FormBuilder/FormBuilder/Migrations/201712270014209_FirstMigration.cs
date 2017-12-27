namespace FormBuilder.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Answers",
                c => new
                    {
                        AnswerId = c.Int(nullable: false, identity: true),
                        InputId = c.Int(nullable: false),
                        UserAnswer = c.String(nullable: false, maxLength: 500),
                    })
                .PrimaryKey(t => t.AnswerId);
            
            CreateTable(
                "dbo.Forms",
                c => new
                    {
                        FormId = c.Int(nullable: false, identity: true),
                        GuidId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.FormId);
            
            CreateTable(
                "dbo.Inputs",
                c => new
                    {
                        InputId = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false, maxLength: 30),
                        Label = c.String(nullable: false, maxLength: 250),
                        Placeholder = c.String(maxLength: 250),
                        Description = c.String(maxLength: 250),
                        Required = c.Boolean(),
                        FormId = c.Int(nullable: false),
                        Options = c.String(),
                    })
                .PrimaryKey(t => t.InputId)
                .ForeignKey("dbo.Forms", t => t.FormId, cascadeDelete: true)
                .Index(t => t.FormId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Inputs", "FormId", "dbo.Forms");
            DropIndex("dbo.Inputs", new[] { "FormId" });
            DropTable("dbo.Inputs");
            DropTable("dbo.Forms");
            DropTable("dbo.Answers");
        }
    }
}
