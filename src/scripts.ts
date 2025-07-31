const header = document.getElementById("header") as HTMLElement | null;
const sellTabFilter = document.getElementById(
    "sellTabFilter"
) as HTMLElement | null;
const cardWrapper = document.getElementById(
    "sellCardWrapper"
) as HTMLUListElement;

const choosingEl = document.getElementById("choosing") as HTMLUListElement;
const actionBlockColor = document.getElementById(
    "actionWrapper"
) as HTMLDivElement;

interface Product {
    img: string;
    type: "Bed" | "Chair" | "Closet" | "Lamp";
    title: string;
    raiting: number;
    price: number;
    id: string;
}

type FurnitureItem = {
    [key: string]: string;
    src: string;
};

type FurnitureGroup = {
    [key: string]: FurnitureItem[];
};

const furniture: FurnitureGroup = {
    pot_left: [
        { color_pot_left_1: "lightgreen", src: "images/ConteinrFlower.png" },
        { color_pot_left_3: "lightgray", src: "images/ConteinrFlower2.png" },
    ],
    case: [
        { color_case_1: "#964b00", src: "images/box.png" },
        { color_case_2: "yellow", src: "images/boxLight.png" },
    ],
    sofa: [
        { color_sofa_1: "lightgray", src: "images/sofa.png" },
        { color_sofa_2: "teal", src: "images/sofaLightBlue.png" },
        { color_sofa_3: "black", src: "images/sofaBlack.png" },
    ],
    pot_right: [
        { color_pot_right_1: "lightgray", src: "images/ConteinrFlower2.png" },
        { color_pot_right_3: "lightgreen", src: "images/ConteinrFlower.png" },
    ],
};

const products: Product[] = [
    {
        img: "./images/Chair_Rocking.png",
        type: "Chair",
        title: "Chair Rocking",
        raiting: 4,
        price: 323,
        id: "ChairRocking",
    },
    {
        img: "./images/Chair_Navy.png",
        type: "Chair",
        title: "Navy Chair",
        raiting: 4,
        price: 187,
        id: "ChairNavy",
    },
    {
        img: "./images/Chair_TonHoffmann.png",
        type: "Chair",
        title: "Ton Hoffmann",
        raiting: 5,
        price: 386,
        id: "ChairTonHoffmann",
    },
    {
        img: "./images/Chair_LudwigMies.png",
        type: "Chair",
        title: "Ludwig Mies",
        raiting: 4,
        price: 473,
        id: "ChairLudwigMies",
    },
    {
        img: "./images/BedRed.png",
        type: "Bed",
        title: "Bed Red",
        raiting: 4,
        price: 200,
        id: "BedRed",
    },
    {
        img: "./images/Bed_White.png",
        type: "Bed",
        title: "Bed White",
        raiting: 4,
        price: 350,
        id: "BedWhite",
    },
    {
        img: "./images/Bed_Gray.png",
        type: "Bed",
        title: "Bed Gray",
        raiting: 5,
        price: 350,
        id: "BedGray",
    },
    {
        img: "./images/Bed_Blue.png",
        type: "Bed",
        title: "Bed Blue",
        raiting: 4,
        price: 350,
        id: "BedBlue",
    },
    {
        img: "./images/Wardrobe_White.png",
        type: "Closet",
        title: "Wardrobe White",
        raiting: 4,
        price: 200,
        id: "WardrobeWhite",
    },
    {
        img: "./images/Wardrobe_Gray.png",
        type: "Closet",
        title: "Wardrobe Gray",
        raiting: 4,
        price: 350,
        id: "WardrobeGray",
    },
    {
        img: "./images/Wardrobe_Basic.png",
        type: "Closet",
        title: "Wardrobe Basic",
        raiting: 5,
        price: 350,
        id: "WardrobeBasic",
    },
    {
        img: "./images/Wardrobe_Blue.png",
        type: "Closet",
        title: "Wardrobe Blue",
        raiting: 4,
        price: 350,
        id: "WardrobeBlue",
    },
    {
        img: "./images/Lamp_Basic.png",
        type: "Lamp",
        title: "Lamp Basic",
        raiting: 4,
        price: 200,
        id: "LampBasic",
    },
    {
        img: "./images/Lamp_Tripad.png",
        type: "Lamp",
        title: "Lamp Tripad",
        raiting: 4,
        price: 350,
        id: "LampTripad",
    },
    {
        img: "./images/Lamp_Tripad_Squre.png",
        type: "Lamp",
        title: "Lamp Tripad Squre",
        raiting: 5,
        price: 350,
        id: "LampTripadSqure",
    },
    {
        img: "./images/Lamp_Unique.png",
        type: "Lamp",
        title: "Lamp Unique",
        raiting: 4,
        price: 350,
        id: "LampUnique",
    },
];

if (header instanceof HTMLElement) {
    window.addEventListener("scroll", () => {
        const sectionRect = choosingEl.getBoundingClientRect();

        header.style.background =
            sectionRect.top <= 100 ? "#353535" : "transparent";
    });
} else {
    console.error(
        "Element with id 'header' not found or is not an HTMLElement"
    );
}

sellTabFilter?.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;

    if (target?.id) {
        changeProductInShop(target.id);
    }
});

function changeProductInShop(targetId: string): void {
    deleteCaresItemsInShop();

    for (const key in products) {
        if (Object.prototype.hasOwnProperty.call(products, key)) {
            const element = products[key];

            if (
                element.type.toLocaleLowerCase() ===
                targetId.toLocaleLowerCase()
            ) {
                const { img, type, title, raiting, price, id } = element;

                createCardItemInShop(img, type, title, raiting, price, id);
            }
        }
    }
}

function findCardItemInShop(targetId: string): Product | undefined {
    return products.find((p) => p.type === targetId);
}

function deleteCaresItemsInShop() {
    while (cardWrapper.firstChild) {
        cardWrapper.firstChild.remove();
    }
}

function createCardItemInShop(
    imgUrl: string,
    type: string,
    title: string,
    raiting: number,
    priceItem: number,
    id: string
): void {
    const card = document.createElement("li");
    card.setAttribute("class", "sell-card scale-animation-element");
    card.setAttribute("id", `furniture_id_${id}`);

    const imageBlock = document.createElement("figure");
    imageBlock.setAttribute("class", "sell-card-img");

    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    img.setAttribute("alt", title);
    img.setAttribute("width", "250");

    const actionWrapper = document.createElement("div");
    actionWrapper.setAttribute("class", "sell-card-action");

    const typeProduct = document.createElement("p");
    typeProduct.setAttribute("class", "sell-card-type");
    typeProduct.textContent = type;

    const titleProduct = document.createElement("p");
    titleProduct.setAttribute("class", "sell-card-title");
    titleProduct.textContent = title;

    const formRaiting = document.createElement("form");
    formRaiting.setAttribute("class", "sell-card-raiting");

    const wrapperRaiting = document.createElement("div");
    wrapperRaiting.setAttribute("class", "rating");

    for (let i = 1; i <= 5; i++) {
        const inputRaiting = document.createElement("input");
        inputRaiting.setAttribute("value", i.toString());
        inputRaiting.setAttribute("name", `rate-${i}`);
        inputRaiting.setAttribute("id", `star${i}`);
        inputRaiting.setAttribute("type", "radio");

        const labelRaiting = document.createElement("label");
        labelRaiting.setAttribute("title", `Star ${i}`);
        labelRaiting.setAttribute("for", `star${i}`);

        wrapperRaiting.append(inputRaiting, labelRaiting);
    }

    formRaiting.append(wrapperRaiting);

    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "sell-card-fotter");

    const price = document.createElement("p");
    price.setAttribute("class", "sell-card-price");
    price.textContent = `$${priceItem}`;

    const btnAddToBasket = document.createElement("button");
    btnAddToBasket.setAttribute("class", "sell-card-action-add");
    btnAddToBasket.textContent = "+";

    imageBlock.append(img);
    actionWrapper.append(typeProduct, titleProduct, formRaiting);
    cardFooter.append(price, btnAddToBasket);
    card.append(imageBlock, actionWrapper, cardFooter);

    cardWrapper?.append(card);
}

function createElColorFurniture(furniture: FurnitureGroup): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "action-block";
    wrapper.setAttribute("id", "actionBlockColor");

    for (const key in furniture) {
        const actionItem = document.createElement("div");
        actionItem.className = "action-item";

        const figure = document.createElement("figure");
        figure.id = key;

        const img = document.createElement("img");
        img.src = furniture[key][0].src;
        img.alt = key;
        figure.appendChild(img);

        const colorSectionWrapper = document.createElement("div");
        colorSectionWrapper.className = "color-section-wrapper";

        const colorSelector = document.createElement("div");
        colorSelector.className = "color-selector";

        furniture[key].forEach((item, index) => {
            const colorKey = Object.keys(item).find((k) => k !== "src")!;
            const colorClass = item[colorKey];

            const input = document.createElement("input");
            input.type = "radio";
            input.setAttribute("data-key", key);
            input.setAttribute("data-src", item.src);
            input.name = colorKey.split("_").slice(0, 2).join("_");
            input.id = colorKey;
            if (index === 0) input.checked = true;

            const label = document.createElement("label");
            label.htmlFor = colorKey;
            label.className = `color-option`;
            label.style.backgroundColor = colorClass;

            colorSelector.appendChild(input);
            colorSelector.appendChild(label);
        });

        const triangle = document.createElement("div");
        triangle.className = "triangular-arrow";

        colorSectionWrapper.appendChild(colorSelector);
        colorSectionWrapper.appendChild(triangle);

        actionItem.appendChild(figure);
        actionItem.appendChild(colorSectionWrapper);

        wrapper.appendChild(actionItem);
    }

    return wrapper;
}
actionBlockColor.appendChild(createElColorFurniture(furniture));

actionBlockColor.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "INPUT" && target.getAttribute("type") === "radio") {
        const key = target.getAttribute("data-key");
        const src = target.getAttribute("data-src");

        if (!key || !src) return;

        const furnitureElement = document.getElementById(key);
        if (!furnitureElement) return;

        const img = furnitureElement.querySelector("img") as HTMLImageElement;
        if (!img) return;

        img.src = src;
    }
});