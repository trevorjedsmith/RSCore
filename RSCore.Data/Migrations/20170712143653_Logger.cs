using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RSCore.Data.Migrations
{
    public partial class Logger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Logger",
                columns: table => new
                {
                    LoggerID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Exception = table.Column<string>(nullable: true),
                    ExceptionType = table.Column<string>(nullable: true),
                    InnerException = table.Column<string>(nullable: true),
                    InnerExceptionType = table.Column<string>(nullable: true),
                    LogDate = table.Column<DateTime>(nullable: false),
                    StackTrace = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logger", x => x.LoggerID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logger");
        }
    }
}
