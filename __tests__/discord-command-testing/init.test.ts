import { messageHandler } from "../../src/handlers/";
import { Message } from 'discord.js';

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

describe("Incorrect uses of [Init]iative", ()=>{
    test("Non existant creature", async ()=>{
        msg.content = "/init ;alskdfj"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/)
        );
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Unknown creature/)
        );
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Creatures: test test1/)
        );
    })

    test("Incorrect number or Dice", async ()=>{
        msg.content = "/init test a;sl"
        await messageHandler(msg);

        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/Error/)
        );
        expect(msg.channel.send).toHaveBeenCalledWith(
            expect.stringMatching(/is not a number or Dice number./)
        );
    })
})