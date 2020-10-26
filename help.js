var Embed = {
  	color: 0x0000FF,
  	title: 'Help - Convert command',
  	fields: [
  		{
  			name: '**Keyword**',
  			value: '`convert`',
  		},
  		{
  			name: '**Uses**',
  			value: 'convert modexport code to Ship Editor Code',
  		},
  		{
  			name: '**Syntax**',
  			value: '`!convert <conversion type> <publicy> <Code or Code File>`',
  		},
  		{
  			name: '*<conversion type>: Defines the type of code source:*',
  			value: '`-c`: Convert the code directly\n`-f`: Convert the code in File',
  		},
  		{
  			name: '*<publicy>: Defines how the result code will sent to you:*',
  			value: '`-pr`: Private: the result code will be sent to you through DM and your command will be deleted\n`-pb`: Public: the result code will be sent to the channel you are execute this command and your command will not be deleted',
  		},
      {
        name: '**Examples**',
        value: '`!convert -c -pr <Code>`: convert the code directly and also privately\n`!convert -f -pb <File>`: convert the code in the file publicly\n`!convert help`: Display this help'
      },
      {
        name: '\u200b',
        value: msg
      }
  	]
  };
