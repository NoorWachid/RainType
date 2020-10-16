const setting = {
    theme: {
        selected: 0,
        options: [
            { value: 'theme_light.css', text: 'Light', alternate: '' }, 
            { value: 'theme_dark.css', text: 'Dark', alternate: '' },
            { value: 'theme_sepia.css', text: 'Sepia', alternate: '' },
            { value: 'theme_rainbow.css', text: 'Rainbow', alternate: '' }
        ]
    }, 
    mode: {
        selected: 0,
        options: [
            { value: 'classic', text: 'Classic', alternate: 'Scrolling down text' }, 
            { value: 'float', text: 'Float', alternate: 'Scrolling down with input follow highlighter' }, 
            { value: 'train', text: 'Train', alternate: 'Scrolling right text' },
        ]
    }, 
    time: {
        selected: 0,
        options: [
            { value: 30, text: '30s', alternate: 'Half minutes' },
            { value: 60, text: '60s', alternate: 'A minutes' }, 
            { value: 120, text: '2m', alternate: 'Two minutes' }, 
            { value: 300, text: '5m', alternate: 'Five minutes' }, 
            { value: 600, text: '10m', alternate: 'Ten minutes' }
        ]
    }, 
    level: {
        selected: 0,
        options: [
            { value: 300, text: 'Novice', alternate: 'First 300 words' }, 
            { value: 1000, text: 'Intermediate', alternate: 'First 1000 words' }, 
            { value: 3000, text: 'Advanced', alternate: 'First 3000 words' },
            { value: 10000, text: 'Superior', alternate: 'First 10000 words' }
        ]
    }, 
    language: {
        selected: 0,
        options: [
            { value: 'en_ga.txt', text: 'English GA', alternate: 'American, Canadian' }, 
            { value: 'en_rp.txt', text: 'English RP', alternate: 'British, Australian' }, 
            { value: 'id.txt', text: 'Indonesian', alternate: 'Indonesian' }
        ]
    }
};

const Main = CreateNode('main');

const Board       = CreateNode('div', { className: 'board' });
const WaitScreen  = CreateNode('div', { className: 'wait-screen' });
const WordList    = CreateNode('div', { className: 'word-list' });
const Highlighter = CreateNode('span', { className: 'highlighter' });

const InputContainer = CreateNode('div', { className: 'input-container' });
const Input          = CreateNode('input', { type: 'text', className: 'input' });
const Info           = CreateNode('span', { className: 'info' });

const Score = CreateNode('div', { className: 'score' });

const SettingContainer = CreateNode('div', { className: 'setting-container' });
const ButtonContainer  = CreateNode('div', { className: 'button-container' });
const RestartButton    = CreateNode('button', { textContent: 'Restart' });
const SettingButton    = CreateNode('button', { textContent: 'Setting' });

const Setting = CreateNode('div', { className: 'setting' });
const SaveSettingButton = CreateNode('button', { textContent: 'Save' });

for (const key in setting)
{
    const SettingCategory = CreateNode('div', { className: 'setting-category' });
    const CheckWhoIsSelected = () => {
        for (const Option of SettingCategory.children)
        {
            if (setting[key].selected == Option.dataset.index) {
                Option.classList.add('active');
            } else {
                if (Option.classList.contains('active')) {
                    Option.classList.remove('active');
                }
            }
        }
    };

    for (const [i, option] of setting[key].options.entries())
    {
        const Option = CreateNode('button', { 
            className: 'setting-option', 
            textContent: option.text,
            title: option.alternate
        });
        Option.dataset.index = i;
        Option.addEventListener('click', () => {
            setting[key].selected = i;
            CheckWhoIsSelected();
        });
        SettingCategory.appendChild(Option);
    }
    CheckWhoIsSelected();
    Setting.appendChild(SettingCategory);
}

Setting.appendChild(SaveSettingButton);

const Footer = CreateNode('footer');
const FooterContent = CreateNode('div', { className: 'content', innerHTML: `
    Crafted with love by <a href="https://github.com/NoorWachid">Noor Wachid</a> ·
    If you find it is useful and you are a nice person please consider to 
    <a href="https://paypal.me/MrWachid"><b>donate</b></a> ·
    Have a nice day! ·
    © TypeIt 2020 
`});
Footer.appendChild(FooterContent);

AppendNodes(document.body, [
    AppendNodes(Main, [
        AppendNodes(Board, [
            WaitScreen,
            WordList,
            Highlighter,
            AppendNodes(InputContainer, [
                Input,
                Info
            ]),
        ]),
        Score, 
        AppendNodes(SettingContainer, [
            AppendNodes(ButtonContainer, [
                RestartButton,
                SettingButton
            ]),
            Setting, 
        ]),
    ]),
    Footer
]);
