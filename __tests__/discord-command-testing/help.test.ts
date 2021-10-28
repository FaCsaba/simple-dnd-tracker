import { messageHandler } from "../../src/handlers/";
import { Message } from "discord.js";
import * as commands from "../../src/commands/command-discriptions.json";

let msg: Message = {
    author: {id: ""},
    content: "",
    channel: {
        send: jest.fn()
    }
} as unknown as Message

beforeEach(()=> {
    msg = {
            author: {id: ""},
            content: "",
            channel: {
                send: jest.fn()
            },
            delete: jest.fn()
        } as unknown as Message  
    });

describe("Incorrect uses of Help", ()=>{
    test("Unknown command", async ()=>{
        msg.content = "/help a;slkdfj";
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/)
        );
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/is not a valid command\./)
        );
    })
})

describe("Correct uses of Help", ()=>{
    test("Just a help by itself", async ()=>{
        msg.content = "/help";
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Help menu/)
        );
    })

    Object.values(commands).forEach((description) =>{
        if (description.name) {
            test("Help " + description.command_name, async ()=>{
                msg.content = "/help " + description.command_name;
                await messageHandler(msg);
        
                expect(msg.channel.send).toHaveBeenCalledWith(
                    expect.stringMatching(`${description.command_name}`)
                );
            })
        } 
    })
})
