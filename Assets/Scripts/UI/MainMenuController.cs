using UnityEngine;

public class MainMenuController : MonoBehaviour
{
    public void OnStartGame()
    {
        Debug.Log("Oyun Başlıyor...");
    }

    public void OnMarket()
    {
        Debug.Log("Market Açıldı");
    }

    public void OnInventory()
    {
        Debug.Log("Envanter Açıldı");
    }
}

