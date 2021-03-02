String.prototype.appendString = function(i,a)
{
	return this.substring(0,i)+a+this.substring(i,this.length);
}
String.prototype.replaceChar =function(i,a)
{
	return this.substring(0,i)+a+this.substring(i+1,this.length);
}
String.prototype.removeChar = function(i)
{
	return this.substring(0,i)+this.substring(i+1,this.length);
}
function convert(input)
{
	let results;
	eval("results=JSON.parse(function(){return "+input.replace(/^(\s|\n|\r)+/,"").replace(/^(var|let|const)/,"").replace(/^\n+/,"")+"}());");
	delete results.typespec;
	return "return "+js2coffee.build("model="+JSON.stringify(results)).code.replace(/\s+(?=[^[\]]*\])/g, ",").replace(/\[,/g, "[").replace(/,\]/g, "]").replace(/'(\w+)':/g, "$1:");
}
const Discord = require('discord.js')
const client = new Discord.Client();
const js2coffee = require('js2coffee');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
		client.user.setActivity("Converting stuffs :)")
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
token = "<bot token here>";

client.login(token);
client.on('message',function(message) {
  var data=message.content||"";
  if (data.indexOf("!")==0)
  {
		var colors={
			Information:"#0000FF",
			Error:"#FF0000",
		}
    var cmd=data.substring(1,data.length).replace(/\s\s*/," ").replace(/\s\s*/," ");
    var msg="\n\n **Note:** I can only active when <@454602208357384201> is online!";
    var alert="";
		var title="Information";
		var info="\nFor more information, please type `!convert help`"
    var input=cmd.split(' ')[1]||"";
    if (cmd.split(' ')[0].toUpperCase()=="CONVERT")
    {
      switch (input.toUpperCase())
      {
				case "-C":
        case "-C ":
          {
						var code=cmd.substring(15,cmd.length);
						while (code[0]==" ") code=code.substring(1,code.length);
            function convertauth (al,tit,cde)
						{
							var success=0;
	            if (cde!="")
							{
								try {
									cde = convert(cde);
									success = 1;
								}
								catch(e) {
									al="Invalid Code Syntax!";
									tit="Error";
								}
							}
							else al="Where's your code ;-;";
							alert=al;
							title=tit;
							code=cde;
							return success;
						}
						var b=0;
						switch((cmd.split(' ')[2]||"").toUpperCase())
						{
							case "-PR":
								if (convertauth("","Information",code)==1) message.author.send(new Discord.MessageEmbed().setTitle("Converted!").setDescription("**Converted code:**\n```coffeescript\n"+code+"```"+msg).setColor("#00FF00"));
								break;
							case "-PB":
								b=1;
							 	if (convertauth("","Information",code)==1) message.channel.send(new Discord.MessageEmbed().setTitle("Converted!").setDescription("**Converted code:**\n```coffeescript\n"+code+"```"+msg).setColor("#00FF00"));
							 break;
							default:
							 message.channel.send(new Discord.MessageEmbed().setTitle("Information").setDescription("You must define if you want your code to be publicly or privately sent by adding `-pr` (private) or `-pb` (public) after the *<conversion type>* option key\nFor example: `!convert -c -pr <Your code>`"+info+msg).setColor("#0000FF"));
						}
						if (b==0)
						{
							message.delete()
  						.then(msg => console.log(`Deleted message from ${msg.author.username}`))
  						.catch(console.error);
						}
					}
          break;
        case "-F ":
        case "-F":
          {
						var b=0;
            if (message.attachments.size>0)
            {
              for (let i of message.attachments.values()) {
                var url=i.url;
                    var request = require('request');
                    request.get(url, function (error, response, body) {
                      if (!error && response.statusCode == 200) {
                        var content = body;
                        if (content.indexOf("var")==0)
                        {
                            if (convert(content)!="return model =\n ")
														{
															var fs=require('fs');
	                            fs.writeFile("result.txt",convert(content),function(err) {
	                              if (!err)
	                              {
																	switch(cmd.split(' ')[2].toUpperCase())
																	{
																		case "-PR":
																		{
																			var pre=(convert(content).length<=1940)?(convert(content)):(convert(content).substring(0,1940)+"...");
			                                message.author.send(new Discord.MessageEmbed().setTitle("Converted!").setDescription("**Code Preview:**\n```coffeescript\n"+pre+"```"+msg).setColor("#00FF00"));
																			message.author.send("",{files:["./result.txt"]});
																		}
																		break;
																		case "-PB":
																		{
																			b=1;
																			var pre=(convert(content).length<=1940)?(convert(content)):(convert(content).substring(0,1940)+"...");
			                                message.channel.send(new Discord.MessageEmbed().setTitle("Converted!").setDescription("**Code Preview:**\n```coffeescript\n"+pre+"```"+msg).setColor("#00FF00"));
																			message.channel.send("",{files:["./result.txt"]});
																		}
																		break;
																		default:
																			message.channel.send(new Discord.MessageEmbed().setTitle("Information").setDescription("You must define if you want your code to be publicly or privately sent by adding `-pr` (private) or `-pb` (public) after the *<conversion type>* option key\nFor example: `!convert -c -pr <Your code>`"+info+msg).setColor("#0000FF"));
																	}
	                              }
	                              else
																{
																	alert="An error occured proccessing the Modexport code!";
																	title="Error";
																}
	                            });
														}
														else
														{
															alert="Invalid Code Syntax!";
															title="Error";
														}
                        }
                        else {
                          alert="Invalid Code Syntax!";
													title="Error";
                        }
                      }
                    });
                }
            }
            else alert="Where's your file ;-;";
						if (b==0)
						{
							message.delete()
  						.then(msg => console.log(`Deleted message from ${msg.author.username}`))
  						.catch(console.error);
						}
          }
          break;
				case "HELP":
				{
					var fs = require('fs');
					fs.readFile("help.js", 'utf8', function(err, data) {
					  if (err) throw err;
					  eval(data);
						message.channel.send({embed: Embed});
					});
				}
				break;
				case "TOOLS":

					break;
        default:
          alert='Invalid convert request!';
      }
    }
    if (alert!="") message.channel.send(new Discord.MessageEmbed().setTitle(title).setDescription(alert+info+msg).setColor(colors[title]));
  }
});
