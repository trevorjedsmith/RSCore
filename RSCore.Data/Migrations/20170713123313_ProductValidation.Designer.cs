using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using RSCore.Data;

namespace RSCore.Data.Migrations
{
    [DbContext(typeof(RSCoreDbContext))]
    [Migration("20170713123313_ProductValidation")]
    partial class ProductValidation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RSCore.Models.LogEntry", b =>
                {
                    b.Property<long>("LogEntryID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EntityFormalNamePlural");

                    b.Property<int>("EntityKeyValue");

                    b.Property<string>("Exception");

                    b.Property<DateTime>("LogDate");

                    b.Property<string>("LogLevel")
                        .IsRequired()
                        .HasMaxLength(5);

                    b.Property<string>("Logger")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Thread")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.HasKey("LogEntryID");

                    b.ToTable("LogEntries");
                });

            modelBuilder.Entity("RSCore.Models.Logger", b =>
                {
                    b.Property<long>("LoggerID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Exception");

                    b.Property<string>("ExceptionType");

                    b.Property<string>("InnerException");

                    b.Property<string>("InnerExceptionType");

                    b.Property<string>("InnerStackTrace");

                    b.Property<DateTime>("LogDate");

                    b.Property<string>("Severity");

                    b.Property<string>("StackTrace");

                    b.Property<string>("UserName");

                    b.HasKey("LoggerID");

                    b.ToTable("Logger");
                });

            modelBuilder.Entity("RSCore.Models.Product", b =>
                {
                    b.Property<int>("ProductID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<decimal>("Price");

                    b.HasKey("ProductID");

                    b.ToTable("Products");
                });
        }
    }
}
