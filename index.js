//TIENES QUE HACER ADMIN AL BOT EN LOS DIFERENTES CANALES PARA QUE FUNCIONE BIEN LA VALIDACION//

/*********** DECLARACION DE LIBRERIAS (INICIO) ***************************************/
require('dotenv').config();  // Para cargar variables de entorno desde un archivo .env
const { Telegraf, Markup } = require('telegraf');
const { v4: uuidv4 } = require('uuid');  // Para generar IDs únicos
const bot = new Telegraf(process.env.BOT_TOKEN);

/*********** DECLARACION DE LIBRERIAS (FIN) ***************************************/

// Función para obtener el teclado personalizado
const getMainMenu = () => {
    return Markup.keyboard([
        ['Mi Cuenta'], 
        ['Referidos'],
        ['Task and Earn']
    ]).resize().oneTime();
};


const taskAndEarnMenu = {
    reply_markup: {
      keyboard: [
        ['𝙲𝙵 (𝙴𝚜𝚝𝚛𝚊𝚝𝚎𝚐𝚒𝚊𝚜)', '☞ 𝙱𝚘𝚡 𝙱𝚃𝚃𝙲'],
        ['☞ 𝙱𝚘𝚡 𝚃𝚁𝚇','☞ 𝙱𝚘𝚡 𝚄𝚂𝙳𝚃'],
        ['ℂ𝕣𝕪𝕡𝕥𝕠 𝕋𝕚𝕘𝕣𝕖𝕤','Apuestas Tigres'],
        ['Volver al menú principal']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };


const users = {};
const referrals = {};
let balance_acumulado = 0;
let balance_cf = 0;
let balance_bttc = 0;
// Generar un enlace de referido
const generateReferralLink = (userId) => {
    return `https://t.me/${process.env.BOT_USERNAME}?start=${userId}`;
};


// COMANDO INICIAL AL DAL START//
bot.start((ctx) => {
    ctx.reply("Bienvenido " + ctx.from.first_name + " Por favor elije una opcion:" , getMainMenu());
});


// //
bot.hears('Volver al menú principal', (ctx) => {

  ctx.reply(
          
  "Elige una opcion "+ctx.from.first_name+": ", getMainMenu());
      
  });

// //

//ESTRUCTURA DE MI CUENTA (INICIO)//
bot.hears('Mi Cuenta', (ctx) => {

ctx.reply(
        
"Usuario: " +ctx.from.first_name+" "+ ctx.from.last_name+  
"\n\nInvitados: 0"+ "\n\nBalance: " +balance_acumulado  
        
);
    
});

//ESTRUCTURA DE MI CUENTA (FIN)//

//ESTRUCTURA DE REFERIDOS (INICIO) //

bot.hears('Referidos', (ctx) => {

    const userId = ctx.from.id.toString();
    const referralId = ctx.message.text.split(' ')[1];

    ctx.reply( "Invita y Gana: 0.01$"  + "" +  `\n\nLink de referido: ${generateReferralLink(userId)}`);

});


//ESTRUCTURA DE REFERIDOS (FIN)//


//TASK AND EARN (INICIO)//


bot.hears('Task and Earn', (ctx) => {
    

    ctx.reply(
            
       /* 
    "Sigue los siguientes canales y Gana 0.01$ por cada uno: \n\nCanal 1: @CF_Estrategias" +
    
   "\n\nCanal 2: @boxbttc \n\nCanal 3: @boxtrx \n\nCanal 4: @cryptotigres \n\nCanal 5: @boxusdt1 "  
   */ 
   "Lista de canales, Gana 0.01$ por unirte a los siguientes canales" ,taskAndEarnMenu
            
    );
        
    });


//Crypto Finanzas (INICIO)//
bot.hears('𝙲𝙵 (𝙴𝚜𝚝𝚛𝚊𝚝𝚎𝚐𝚒𝚊𝚜)', (ctx) => {
    ctx.reply('Unete a:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '𝙲𝙵 (𝙴𝚜𝚝𝚛𝚊𝚝𝚎𝚐𝚒𝚊𝚜)', url: 'https://t.me/CF_Estrategias' }],
          [{ text: 'Verificar suscripción al canal', callback_data: 'verify_cf' }]
        ]
      }
    });
  });
//Crypto Finanzas (FIN)//


//Box BTTC (INICIO)//
bot.hears('☞ 𝙱𝚘𝚡 𝙱𝚃𝚃𝙲', (ctx) => {
  ctx.reply('Unete a:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '☞ 𝙱𝚘𝚡 𝙱𝚃𝚃𝙲', url: 'https://t.me/boxbttc' }],
        [{ text: 'Verificar suscripción al canal', callback_data: 'verify_bttc' }]
      ]
    }
  });
});

//Box BTTC (FIN)//

//Box TRX (INICIO)//
bot.hears('☞ 𝙱𝚘𝚡 𝚃𝚁𝚇', (ctx) => {
  ctx.reply('Unete a:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '☞ 𝙱𝚘𝚡 𝚃𝚁𝚇', url: 'https://t.me/boxtrx' }],
        [{ text: 'Verificar suscripción al canal', callback_data: 'verify_trx' }]
      ]
    }
  });
});

//Box TRX (FIN)//


//Box USDT (INICIO)//
bot.hears('☞ 𝙱𝚘𝚡 𝚄𝚂𝙳𝚃', (ctx) => {
  ctx.reply('Unete a:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '☞ 𝙱𝚘𝚡 𝚄𝚂𝙳𝚃', url: 'https://t.me/boxusdt1' }],
        [{ text: 'Verificar suscripción al canal', callback_data: 'verify_usdt' }]
      ]
    }
  });
});

//Box USDT (FIN)//


//Box USDT (INICIO)//
bot.hears('ℂ𝕣𝕪𝕡𝕥𝕠 𝕋𝕚𝕘𝕣𝕖𝕤', (ctx) => {
  ctx.reply('Unete a:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'ℂ𝕣𝕪𝕡𝕥𝕠 𝕋𝕚𝕘𝕣𝕖𝕤', url: 'https://t.me/cryptotigres' }],
        [{ text: 'Verificar suscripción al canal', callback_data: 'verify_tigres' }]
      ]
    }
  });
});

//Box USDT (FIN)//

//APUESTAS TIGRES (INICIO)//
bot.hears('Apuestas Tigres', (ctx) => {
  ctx.reply('Unete a:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Apuestas Tigres', url: 'https://t.me/apuestastigres' }],
        [{ text: 'Verificar suscripción al canal', callback_data: 'verify_at' }]
      ]
    }
  });
});

//APUESTAS TIGRES (FIN)//


// CUADRO DE DATOS DEL USUARIO //
/*
console.log('Nombre del usuario:',userId);
console.log('Se acaba de unir a: ',chatId);
console.log('Tiene un saldo acumulado de: ',balance_acumulado);*/


//VERIFICAR SUSCRIPCION CF_ESTRATEGIAS (INICIO)//  

bot.action('verify_cf', async (ctx) => {

    const userId = ctx.from.id;
    const chatId = '@CF_Estrategias'; 
    
    try {
      const member = await bot.telegram.getChatMember(chatId, userId);
      if (member.status === 'member' || member.status === 'administrator' || member.status === 'creator') {

        if (chatId =='@CF_Estrategias' && balance_cf<=0 ){  

        balance_acumulado += 0.01;
        balance_cf += 1;
        
        ctx.reply('¡Verificado!');
        } else {

          ctx.reply(`¡Ya eres ${member.status} de este canal!`);
        }
       
      } else {
        ctx.reply('No estás suscrito al canal. Por favor, únete para continuar.');
      }
    } catch (error) {
      
      ctx.reply('Ocurrió un error al verificar la suscripción. Por favor, inténtalo de nuevo.');
      
    }
  });

//VERIFICAR SUSCRIPCION CF_ESTRATEGIAS (FIN)// 


//VERIFICAR SUSCRIPCION BOX BTTC (INICIO)// 
bot.action('verify_bttc', async (ctx) => {
  const userId = ctx.from.id;
  const chatId = '@boxbttc'; // Reemplaza con el ID de tu canal
  
  try {
    const member = await bot.telegram.getChatMember(chatId, userId);
    if (member.status === 'member' || member.status === 'administrator' || member.status === 'creator') {

      if (balance_acumulado <0.02 && balance_bttc<=0){  

      balance_acumulado += 0.01;
      balance_bttc += 1;
      
      ctx.reply('¡Verificado!');

      } else {

        ctx.reply(`¡Ya eres ${member.status} de este canal!`);

      }
     
    } else {
      ctx.reply('No estás suscrito al canal. Por favor, únete para continuar.');
    }
  } catch (error) {
    
    ctx.reply('Ocurrió un error al verificar la suscripción. Por favor, inténtalo de nuevo.');
    
  }
});

//VERIFICAR SUSCRIPCION BOX BTTC (FIN)//




//ESTRUCTURA DE MI CUENTA (FIN)//






//LANZAR EL BOT//
bot.launch();