using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RSCore.Data.Migrations
{
    public partial class LogEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LogEntries",
                columns: table => new
                {
                    LogEntryID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EntityFormalNamePlural = table.Column<string>(nullable: true),
                    EntityKeyValue = table.Column<int>(nullable: false),
                    Exception = table.Column<string>(nullable: true),
                    LogDate = table.Column<DateTime>(nullable: false),
                    LogLevel = table.Column<string>(maxLength: 5, nullable: false),
                    Logger = table.Column<string>(maxLength: 30, nullable: false),
                    Message = table.Column<string>(maxLength: 256, nullable: false),
                    Thread = table.Column<string>(maxLength: 10, nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogEntries", x => x.LogEntryID);
                });

            //Sql("CREATE NONCLUSTERED INDEX IDX_LogEntries_LogDate ON LogEntries (LogDate DESC)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LogEntries");
        }
    }
}
