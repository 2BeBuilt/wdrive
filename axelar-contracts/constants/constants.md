Deployed WarpDrive for Binance at 0xd51a2d698137e2F70C54Fd626678fcAA66B2E69d.
Deployed WarpDrive for Avalanche at 0x06d1F524D4aaE7833c6c2933998496B7f6ad97ce.
Deployed WarpDrive for Ethereum at 0xDA0F18B07db7e3095a51C4d419ee14557A03dD55.
Deployed WarpDrive for Polygon at 0x402522550C7E2747C27CA409be8Aa78D44c9C94F.

-Не те адреса, короче конфиг у нас пизданутый, не тот который я скинул, а старый))))) надо новый вставить и все норм должно быть))))

-BNB - Goerli акселяр показывает как будто Ropsten вызываем, надо Goerli. То же самое и с матика на герли, destination chain герли сделать полагаю

-Matic -> BSC "something went wrong" (в обратную норм)

-Мы вставляем что в новыйУРИ? что-то не поменялось, хотя должно, я поменял контракт теперь в функции update(tokenId) один инпут и выставляется ури автоматом

-ETH->BNB зависаем на акселяре, approve (может как раз из-за Герли?)

-да, Goerli потеряно, но с самого Goerli когда отправляем, то показывает правильно вроде

-полигон-> avalanche неправильный адрес, короче везде где не те адреса зависает транзакция (потом прошла и зарефандилась)

-САМОЕ ГЛАВНОЕ

-очень много подтверждений транзакций выскакивает иногда
-обновить контракты (тогда все заработает по идее)
-поменять update(tokenId) юзер инпутит, tokenURI автоматом отправляется сам там

npm run build && npm run deploy evm/warp-drive local Polygon Avalanche && npm run execute evm/warp-drive local Polygon Avalanche
