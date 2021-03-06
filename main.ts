namespace SpriteKind {
    export const Grocery = SpriteKind.create()
    export const CartItem = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Grocery, SpriteKind.Grocery, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(sprite, myTiles.tile1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Grocery, function (player, grocery) {
    if (controller.A.isPressed()) {
        addToCart(grocery)
        pause(100)
    }
})
function addItem (itemImg: Image, cost: number, weight: number, name: string) {
    item = sprites.create(itemImg, SpriteKind.Grocery)
    sprites.setDataNumber(item, "cost", cost)
    sprites.setDataNumber(item, "weight", weight)
    sprites.setDataString(item, "name", name)
    tiles.placeOnRandomTile(item, myTiles.tile1)
}
function createSubTotalSprite () {
    subTotalSprite = textsprite.create("$0")
    subTotalSprite.left = 0
    subTotalSprite.top = 0
    subTotalSprite.setFlag(SpriteFlag.RelativeToCamera, true)
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile10, function (sprite, location) {
    reciept = "TOTAL:$" + subtotal
    cartItems = sprites.allOfKind(SpriteKind.CartItem)
    for (let c of cartItems) {
        reciept = "" + reciept + "\n" + sprites.readDataString(c, "name") + "$" + sprites.readDataNumber(c, "cost")
    }
    game.showLongText(reciept, DialogLayout.Center)
    info.setScore(subtotal)
    game.over(true)
})
function addAllItems () {
    for (let i = 0; i <= groceryImages.length - 1; i++) {
        addItem(groceryImages[i], groceryCosts[i], groceryWeights[i], groceryNames[i])
    }
}
function addToCart (grocery: Sprite) {
    cartItem = sprites.create(grocery.image, SpriteKind.CartItem)
    cartItem.follow(player)
    cartItem.x = player.x
    cartItem.y = player.y
    // Update Subtotal
    subtotal += sprites.readDataNumber(grocery, "cost")
    subTotalSprite.setText("$" + subtotal)
    // Update speed
    speed += 0 - sprites.readDataNumber(grocery, "weight")
    // set minimum speed
    if (speed < 0) {
        speed = 10
    }
    controller.moveSprite(player, speed, speed)
    // Stores reciept date in cart item
    name = sprites.readDataString(grocery, "name")
    cost = sprites.readDataNumber(grocery, "cost")
    sprites.setDataString(cartItem, "name", name)
    sprites.setDataNumber(cartItem, "cost", cost)
}
let cost = 0
let name = ""
let cartItem: Sprite = null
let cartItems: Sprite[] = []
let subtotal = 0
let reciept = ""
let subTotalSprite: TextSprite = null
let item: Sprite = null
let player: Sprite = null
let groceryCosts: number[] = []
let groceryWeights: number[] = []
let groceryNames: string[] = []
let groceryImages: Image[] = []
let speed = 0
speed = 100
groceryImages = [
img`
    . . . 2 2 2 . . . . . . . . . . 
    . . . c c c 6 6 8 8 . . . . . . 
    . . 6 1 1 1 1 1 9 6 8 . . . . . 
    . 6 1 1 1 1 1 1 8 9 6 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    6 1 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 . 8 9 8 . . . . 
    8 9 1 1 1 1 1 8 8 9 9 8 . . . . 
    8 9 9 9 9 9 9 9 9 9 9 8 . . . . 
    8 6 9 9 9 9 9 9 9 9 9 8 . . . . 
    . 8 6 9 9 9 9 9 9 9 6 8 . . . . 
    . . 8 8 8 8 8 8 8 8 8 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . 2 2 2 . . . . . . . . . . 
    . . . c c c 6 6 8 8 . . . . . . 
    . . 6 e e e e e 9 6 8 . . . . . 
    . 6 e e e e e e 8 9 6 8 . . . . 
    6 e e e e e e 8 . 8 e 8 . . . . 
    6 e e e e e e 8 . 8 e 8 . . . . 
    8 e e e e e e 8 . 8 e 8 . . . . 
    8 e e e e e e 8 8 e e 8 . . . . 
    8 e e e e e e e e e e 8 . . . . 
    8 6 e e e e e e e e e 8 . . . . 
    . 8 6 e e e e e e e 6 8 . . . . 
    . . 8 8 8 8 8 8 8 8 8 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . 6 6 6 . . . . . . 
    . . . . . . . c b c . . . . . . 
    . . . . . c c c b c c c . . . . 
    . . . . c b b b b b b b c . . . 
    . . . . c 1 b b b b b 1 c . . . 
    . . . . c 1 1 7 1 7 1 1 c . . . 
    . . . . c 1 1 1 7 1 1 1 c . . . 
    . . . . c 1 1 a c a 1 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a c 1 c . . . 
    . . . . c 1 a c a c a 1 c . . . 
    . . . . c 1 c a c a 1 1 c . . . 
    . . . . c 1 a c a 1 1 1 c . . . 
    . . . . c b 1 a 1 1 1 b c . . . 
    . . . . c b b b b b b b c . . . 
    . . . . . c c c c c c c . . . . 
    `,
img`
    . c c c c c c c c c c c c c . . 
    c b b b b b b b b b b b b b c . 
    c b b b b b b b b b b b b b c . 
    c c c c c c c c c c c c c c c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d c c c 1 c c c 1 c c c d c . 
    c d c 1 c 1 c 1 c 1 1 c d d c . 
    c d c 1 c 1 c c c 1 1 c d d c . 
    c d c c c 1 c 1 c 1 1 c d d c . 
    c d d 1 1 1 1 1 1 1 1 1 d d c . 
    c d d 1 1 1 2 2 2 1 1 1 d d c . 
    c d d 1 1 2 8 8 8 2 1 1 d d c . 
    c d d 1 1 2 8 d 8 2 1 1 d d c . 
    c d d 1 1 2 8 6 8 2 1 1 d d c . 
    . c d 1 1 1 2 2 2 1 1 1 d c . . 
    . . c c c c c c c c c c c . . . 
    `,
img`
    . . . c c c c . . . . . . . . . 
    . . c e e e e c c c . . . . . . 
    . c e e e e e e e e c . . . . . 
    . c e e e e e e e e e c . . . . 
    f e e e e c c c e e e c . b b . 
    f e e e c e e e c c c c c d d b 
    f c e e f e e e e e e e c d d b 
    f c c c f e e e f f f f c b b b 
    f c c c c f f f c c c f . c c . 
    . f c c c c c c c c c f . . . . 
    . f c c c c c c c c f . . . . . 
    . . f f f f f f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . e e e e e e . . . . . 
    . . . . e e f e e e e e . . . . 
    . . . e e e e e e e f e e . . . 
    . . e e e e e e e e e e e e . . 
    . . e e e e e e e e e e e e e . 
    . e e e e e f e e e e e e f e e 
    . e f e e e e e e e e e e e e e 
    . e e e e e e e e e e e e e e e 
    . e e e e e e e e e e e f e e e 
    . e e e e f e e e e e e e e e . 
    . . e e e e e e e e e e e e . . 
    . . . e e e e e f f e e e e . . 
    . . . . e e e e e e e e . . . . 
    . . . . . . e e e e e . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . c c c c c c c . . . . . 
    . . . c d d d d d d d c . . . . 
    . . c d d d d d b b d d c . . . 
    . . b c d d d d d d d c b . . . 
    . . b 2 c c c c c c c 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 2 2 2 2 2 2 b . . . 
    . . b 2 2 2 b b b 2 2 2 b . . . 
    . . b 2 2 b 2 2 2 b 2 2 b . . . 
    . . d 1 2 b 2 2 2 b 2 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 b 2 2 2 b 1 1 d . . . 
    . . d 1 1 1 b b b 1 1 1 d . . . 
    . . . d 1 1 1 1 1 1 1 d . . . . 
    . . . . d d d d d d d . . . . . 
    `,
img`
    . . c c c c c c c c c c . . . . 
    . c d d d d d d d c b b c . . . 
    c d d d d d d d c b d b b c . . 
    c c d d d d d d d c b b c c . . 
    c b c c c c c c c c c c b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b b 8 9 6 9 6 9 6 9 8 b c . . 
    c b 8 9 8 b 8 9 9 9 8 b b c . . 
    . c c c c c c c c c c c c . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . b 1 1 1 1 1 1 1 1 1 . . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 8 8 . . 
    . . b 1 1 1 1 1 1 1 8 8 8 8 . . 
    . . b 1 1 1 5 5 5 5 8 8 8 8 . . 
    . . b 1 1 5 5 5 5 5 5 8 8 8 . . 
    . . b 1 8 5 5 5 5 5 5 8 8 8 . . 
    . . c 8 8 5 5 5 5 5 5 8 1 1 . . 
    . . c 8 8 5 5 5 5 5 5 1 1 1 . . 
    . . c 8 8 8 5 5 5 5 1 1 1 1 . . 
    . . c 8 8 8 1 1 1 1 1 1 1 1 . . 
    . . c 2 2 2 1 1 1 1 6 6 6 1 . . 
    . . b 1 2 1 1 1 1 1 1 1 1 1 . . 
    . . b 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . . b b b b b b b b b b . . . 
    `,
img`
    . . . . . . . 6 . . . . . . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . 6 6 7 6 6 7 6 7 6 6 7 7 6 . . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 7 6 7 6 7 6 . 
    6 7 6 7 6 7 6 6 7 6 6 7 6 7 6 . 
    6 6 6 7 6 7 6 6 7 6 6 7 6 6 6 . 
    . 6 6 7 6 7 6 6 7 6 6 7 6 6 . . 
    . 6 6 7 6 7 7 6 7 6 6 7 6 6 . . 
    . . 6 6 6 6 7 6 7 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 . . . . . 
    `,
img`
    . . . . . . . . . . . . . f . . 
    . . . . . . 5 5 . . . . f . f . 
    . . . . . . 5 5 d 5 5 f . f . . 
    . . . . . 5 5 5 5 5 5 5 f . . . 
    . . . . d d 5 d 5 d 5 d 5 . . . 
    . . . 5 d 5 5 5 d 5 5 5 5 5 . . 
    . . . f f f f f f f f f f f . . 
    . . . f f f f f f f f f f f . . 
    . . . f f f f f f f f f f f . . 
    . . . . f f f 2 2 2 f f f f . . 
    . . . . f f f 2 2 2 f f f . . . 
    . . . . . f f f f f f f f . . . 
    . . . . . f f f f f f f . . . . 
    . . . . . . f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
groceryNames = [
"Milk",
"Chocolate Milk",
"Grape Soda",
"Oatmeal",
"Turkey",
"Cookie",
"Chicken soup",
"Sardines",
"Flour",
"Watermelon",
"Ramen"
]
groceryWeights = [
8,
8,
2,
1,
12,
1,
0.5,
0.5,
5,
8,
5
]
groceryCosts = [
2,
7,
3,
4,
20,
3,
2,
1,
5,
3,
15
]
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level`)
player = sprites.create(img`
    fffffff......................
    f.fffcd......................
    ..ffddc......................
    ..fdddf......................
    ..fdddd......................
    ...55........................
    ..55dddbbbbbbbbbbbb..........
    ..555....b..b..b..b..........
    .5555....bbbbbbbbbb..........
    .5555....b..b..b..b..........
    .5555....bbbbbbbbbb..........
    .6666.....b.b..b.bb..........
    .6.66......bbbbbbb...........
    .d.d.......d.................
    .d..d......ddddddd...........
    .d..dd......c....c...........
    `, SpriteKind.Player)
controller.moveSprite(player, speed, speed)
scene.cameraFollowSprite(player)
tiles.placeOnTile(player, tiles.getTileLocation(1, 4))
addAllItems()
createSubTotalSprite()
info.startCountdown(25)
