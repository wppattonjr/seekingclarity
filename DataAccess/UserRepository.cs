using Dapper;
using Microsoft.Data.SqlClient;
using SeekingClarity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SeekingClarity.DataAccess
{
    public class UserRepository
    {
        readonly string ConnectionString;

        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("SeekingClarity");
        }

        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from [User]";

            return db.Query<User>(sql).ToList();
        }
        public IEnumerable<User> Get(string id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"select *
                          from [User]
                          where firebaseid = @id";

            var user = db.Query<User>(sql, new { id });

            return user;
        }

        public void Add(User User)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[User] ([FirebaseId], [FirstName], [LastName], [EmailAddress])
                            OUTPUT inserted.id
                            VALUES(@FirebaseId, @FirstName, @LastName, @EmailAddress)";

            var id = db.ExecuteScalar<int>(sql, User);

            User.Id = id;
        }
       
    }
}
