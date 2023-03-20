'use strict';
//Import luxon libraries
//import { DateTime } from "luxon";
var DateTime = luxon.DateTime;

//App Vue
const { createApp } = Vue

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            currentActive: 0,
            newMessageSend: '',
            searchField: '',
            longPressed: false,
            pressHandle: 0,
            currentMessage: 0, 
        }
    },
    methods: {
        activeChat(element){
            //Set current active variable same as index
            if (this.searchField === '') {
                this.currentActive = element;
                return element;   
            }else {
                //Gets custom attribute from html containing name of contact
                const id = event.currentTarget.getAttribute('chat-id');
                //Searches the main array for the index of the given name
                const searchUtility = this.contacts.map(e => e.name).indexOf(id);
                //Set current active variable same as original index in the array
                this.currentActive = searchUtility;
                return element;
            }
        },
        sendMessage(element){
            //Get and format date and time
            const today = new Date();
            const date = today.getDate() + '/' + (today.getMonth() + 1).toString().padStart(2,'0') + '/' + today.getFullYear();
            const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            const formattedDate = `${date} ${time}`;
            
            //Add message to archive of current contact
            this.contacts[this.currentActive].messages.push({date: formattedDate, message : this.newMessageSend, status: 'sent'});
            //Clear field
            this.newMessageSend = '';

            //Set a timeout for a fake reply
            const delay = 1;
            setTimeout(this.fakeReply, delay * 1000);
        },
        fakeReply(formattedDate){
            //Convert emonji to string from HEX
            const emojiThumbsUp = String.fromCodePoint(0x1F44D)

            this.contacts[this.currentActive].messages.push({date: formattedDate, message : emojiThumbsUp, status: 'received'});  
        },
        searchContact(event){
            if (this.searchField !== '') {
                return this.contacts.filter(el => el.name.toLowerCase().includes(this.searchField.toLowerCase()));
            } else {
                return this.contacts;
            }
        },
        longPress(element){
            const delay = 2;
            //Set timeout and assign variable to retrive id
            this.pressHandle = setTimeout(() => this.longPressed = true, delay * 1000);
            //Utility to associate the index of the current event to a control variable - v-show check if longPressed is true and currentMessage and inex are the same, if true show the pop up, else nothing.
            //In this way the pop up is only shown on the clicked element.
            this.currentMessage = element;
        },
        abortLongPress(){
            clearTimeout(this.pressHandle);
        },
        closeModal(){
            //Work but only in the div #main - to fix
            this.longPressed = false;
        },
        deleteMessage(messageSelected){
            this.contacts[this.currentActive].messages.splice(this.currentMessage, 1);
            //Close pop up after delete
            this.longPressed = false;
        },
        getDateFromObj(message, contact){
//PROVA 1
            // if (this.searchField !== '') {
            //     let searchUtility = 0;
            //     const newList = document.querySelectorAll('[chat-id]');
            //     console.log('new list', newList)
            //     newList.forEach((el, index) => {
            //         const id = el.getAttribute('chat-id');
            //         console.log('id', id);
            //     const searchUtility = this.contacts.map(e => e.name).indexOf(id);
            //     console.log('search', searchUtility)
            //     contact = searchUtility;
            //     console.log('contact',contact)
            //     console.log(this.contacts[contact])
            //     const testDate = DateTime.fromFormat(this.contacts[contact].messages[message].date, 'dd/LL/yyyy HH:mm:ss');
            //     console.log(testDate.toFormat('dd/LL/yyyy HH:mm:ss'));
            //     return testDate.toFormat('HH:mm');
            // });
            if (this.searchField !== '') {
                const newList = document.querySelectorAll(`[chat-id*="${this.searchField}" i]`);
                console.log('new list', newList);
                let data = ''
                newList.forEach((item) => {
                    const result = item.getAttribute('chat-id');
                    //console.log(result)
                    const searchUtility = this.contacts.map(e => e.name).indexOf(result);
                    console.log('searc',searchUtility)
                    console.log('contact',this.contacts[searchUtility])
                    console.log('message',this.contacts[searchUtility].messages[message].date)
                    const testDate = DateTime.fromFormat(this.contacts[searchUtility].messages[message].date, 'dd/LL/yyyy HH:mm:ss');
                    data = testDate.toFormat('HH:mm')
                    // return testDate.toFormat('HH:mm');
                })
                return data
            };
            const testDate = DateTime.fromFormat(this.contacts[contact].messages[message].date, 'dd/LL/yyyy HH:mm:ss');
            return testDate.toFormat('HH:mm');
        }
    }
}).mount('#app')