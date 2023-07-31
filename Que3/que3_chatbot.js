module.exports.ChatbotReply = function(message)
	{
		this.Bot_Age = 25;
		this.Bot_Name = "name1";
		this.Bot_University = "VNSGU";
		this.Bot_Country = "India";
		this.Bot_month="July";
		
		message= message.toLowerCase()

		if(message.indexOf("hi") > -1 || 
			message.indexOf("hello") > -1 || 
			message.indexOf("welcome") > -1 )
		{
			return "Hi!";
		} 
		else if(message.indexOf("age") > -1 && 
			message.indexOf("your"))
		{
			return "I'm " + this.Bot_Age;
		}
		else if (message.indexOf("how") > -1 && 
			message.indexOf("are") && 
			message.indexOf("you"))
		{
			return "I'm fine (^_^)"
		}
		else if(message.indexOf("current") > -1 
			&& message.indexOf("month"))
		{
			return "Current month is " + this.Bot_month;
		}
		else if(message.indexOf("where") > -1 
			&& message.indexOf("live") && 
			message.indexOf("you"))
		{
			return "I live in " + this.Bot_Country;
		}
		else if(message.indexOf("bye") > -1 )
		{
			return "Bye...We will meet again.. Nice to meet you!!" 
		}
		return "Sorry, I didn't get it :( ";
	}
